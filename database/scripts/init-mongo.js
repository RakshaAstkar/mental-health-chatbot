db = db.getSiblingDB("mental_health_db");
db.createUser({
  username: "testuser",
  password: "password123",
  roles: [{ role: "readWrite", db: "mental_health_db" }],
});
