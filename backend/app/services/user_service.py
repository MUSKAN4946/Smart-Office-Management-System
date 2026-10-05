from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user_schema import UserRegister, UserCreate, UserUpdate
from app.utils.hashing import hash_password, verify_password

from app.core.jwt_handler import create_access_token


def register_user(db: Session, user: UserRegister):

    hashed_password = hash_password(user.password)

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(db: Session, email: str, password: str):

    user = db.query(User).filter(User.email == email).first()

    if user is None:
        return None

    if not user.is_active:
        return "inactive"

    if not verify_password(password, user.password):
        return False

    access_token = create_access_token(
        data={
            "sub": user.email,
            "role": user.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }


# =========================
# USER MANAGEMENT
# =========================

def create_managed_user(db: Session, user: UserCreate):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        return None

    hashed_password = hash_password(user.password)

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hashed_password,
        role="Employee",
        is_active=True
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def get_all_users(db: Session):

    return db.query(User).order_by(User.id).all()


def get_user_by_id(db: Session, user_id: int):

    return db.query(User).filter(
        User.id == user_id
    ).first()


def update_user(
    db: Session,
    user_id: int,
    user: UserUpdate
):

    existing_user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not existing_user:
        return None

    duplicate_user = db.query(User).filter(
        User.email == user.email,
        User.id != user_id
    ).first()

    if duplicate_user:
        return "duplicate_email"

    existing_user.full_name = user.full_name
    existing_user.email = user.email

    existing_user.role = user.role
    existing_user.is_active = user.is_active

    db.commit()
    db.refresh(existing_user)

    return existing_user


def delete_user(db: Session, user_id: int):

    existing_user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not existing_user:
        return None

    db.delete(existing_user)
    db.commit()

    return {
        "message": "User deleted successfully"
    }