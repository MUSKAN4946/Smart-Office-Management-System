from pydantic import BaseModel, EmailStr, field_validator


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str = "Employee"
    is_active: bool = True

    @field_validator("role")
    @classmethod
    def validate_role(cls, value):
        allowed_roles = ["Admin", "HR", "Employee"]

        if value not in allowed_roles:
            raise ValueError(
                "Role must be Admin, HR, or Employee"
            )

        return value


class UserUpdate(BaseModel):
    full_name: str
    email: EmailStr
    role: str
    is_active: bool

    @field_validator("role")
    @classmethod
    def validate_role(cls, value):
        allowed_roles = ["Admin", "HR", "Employee"]

        if value not in allowed_roles:
            raise ValueError(
                "Role must be Admin, HR, or Employee"
            )

        return value


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        from_attributes = True