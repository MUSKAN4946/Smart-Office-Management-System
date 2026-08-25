function DashboardCard({ title, value }) {

    return (

        <div
            style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "28px",
                width: "100%",
                height: "160px",
                boxSizing: "border-box",

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",

                transition: "all 0.3s ease"
            }}
        >

            <h3
                style={{
                    margin: 0,
                    color: "#475569",
                    fontSize: "20px",
                    fontWeight: "600"
                }}
            >
                {title}
            </h3>

            <h1
                style={{
                    marginTop: "20px",
                    marginBottom: 0,
                    color: "#2563eb",
                    fontSize: "42px",
                    fontWeight: "700"
                }}
            >
                {value}
            </h1>

        </div>

    );

}

export default DashboardCard;