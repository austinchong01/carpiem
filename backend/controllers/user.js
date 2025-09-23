const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createUser(username, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log("User created successfully:", user);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.code === "P2002") {
      const field = error.meta?.target?.[0];
      throw new Error(`${field} already exists`);
    }

    // throw error;
  }
}

async function findUser(email) {
  try {
    const foundUser = await prisma.user.findUnique({ where: { email } });

    if (!foundUser) throw new Error(`User with email '${email}' not found`);

    console.log("User found successfully:", foundUser);
    return foundUser;
  } catch (error) {
    console.error("Error finding user:", error);
    // throw error;
  }
}

async function updateUsername(newUsername, email) {
  try {
    const updatedUsername = await prisma.user.update({
      where: { email },
      data: { username: newUsername },
    });

    console.log("Username updated successfully:", updatedUsername);
    return updatedUsername;
  } catch (error) {
    console.error("Error updating username:", error);

    if (error.code === "P2002") {
      const field = error.meta?.target?.[0];
      throw new Error(`'${field}' already exists`);
    }

    if (error.code === "P2025")
      throw new Error(`User with email '${email}' not found`);

    // throw error;
  }
}

async function deleteUser(email) {
  try {
    const deletedUser = await prisma.user.delete({ where: { email } });

    console.log("User deleted successfully:", deletedUser);
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);

    if (error.code === "P2025")
      throw new Error(`User with email '${email}' not found`);

    // throw error;
  }
}

async function createPost(email, activity) {}

async function deletePost(email, activity) {}

async function addFollower(email, follower) {}

async function deleteFollower(email, follower) {}

async function addFollowing(email, following) {}

async function deleteFollowing(email, following) {}

module.exports = {
  createUser,
  findUser,
  updateUsername,
  deleteUser,
  createPost,
  deletePost,
  addFollower,
  deleteFollower,
  addFollowing,
  deleteFollowing,
};
