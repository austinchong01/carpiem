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

async function createPost(email, title, description) {
  try {
    const user = await findUser(email);

    const newActivity = await prisma.activity.create({
      data: {
        title,
        description,
        userId: user.id,
      },
    });

    console.log("Activity post created successfully:", newActivity);
    return newActivity;
  } catch (error) {
    console.error("Error creating activity post:", error);

    // throw error;
  }
}

async function findPost(email, activityId) {
  try {
    const user = await findUser(email);

    const foundActivity = await prisma.activity.findUnique({
      where: {
        id: activityId,
        userId: user.id,
      },
    });

    if (!foundActivity)
      throw new Error(`Activity ID with '${email}' not found`);

    console.log("Activity found successfully:", foundActivity);
    return foundActivity;
  } catch (error) {
    console.error("Error finding activity:", error);
    // throw error;
  }
}

async function updatePost(email, activityId, title, description) {
  try {
    const user = await findUser(email);
    const updatedPost = await prisma.activity.update({
      where: { id: activityId, userId: user.id },
      data: { title, description },
    });

    console.log("Activity updated successfully:", updatedPost);
    return updatedPost;
  } catch (error) {
    console.error("Error updating activity:", error);

    if (error.code === "P2025")
      throw new Error(
        `Activity post with ID '${activityId}' not found with user`
      );

    // throw error;
  }
}

async function deletePost(email, activityId) {
  try {
    const user = await findUser(email);

    const deletedActivity = await prisma.activity.delete({
      where: {
        id: activityId,
        userId: user.id,
      },
    });

    console.log("Activity post deleted successfully:", deletedActivity);
    return deletedActivity;
  } catch (error) {
    console.error("Error deleting activity post:", error);

    if (error.code === "P2025")
      throw new Error(`Activity post with ID '${activityId}' not found`);

    // throw error;
  }
}

async function addFollower(email, followerEmail) {
  try {
    const user = await findUser(email);
    const followerUser = await findUser(followerEmail);

    const existingFollowCount = await prisma.user.count({
      where: {
        id: user.id,
        followers: {
          some: { id: followerUser.id },
        },
      },
    });
    if (existingFollowCount > 0)
      throw new Error(`${followerEmail} is already following ${email}`);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        followers: {
          connect: { id: followerUser.id },
        },
      },
    });

    console.log("Follower added successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error adding follower:", error);

    // throw error;
  }
}

async function deleteFollower(email, followerEmail) {
  try {
    const user = await findUser(email);
    const followerUser = await findUser(followerEmail);

    const existingFollowCount = await prisma.user.count({
      where: {
        id: user.id,
        followers: {
          some: { id: followerUser.id },
        },
      },
    });
    if (existingFollowCount === 0) {
      throw new Error(`${followerEmail} is not following ${email}`);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        followers: {
          disconnect: { id: followerUser.id },
        },
      },
    });

    console.log("Follower removed successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error removing follower:", error);

    // throw error;
  }
}

async function addFollowing(email, followingEmail) {
  try {
    const user = await findUser(email);
    const followingUser = await findUser(followingEmail);

    const existingFollowCount = await prisma.user.count({
      where: {
        id: user.id,
        following: {
          some: { id: followingUser.id },
        },
      },
    });
    if (existingFollowCount > 0)
      throw new Error(`${email} is already following ${followingEmail}`);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        following: {
          connect: { id: followingUser.id },
        },
      },
    });

    console.log("Following added successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error adding following:", error);

    // throw error;
  }
}

async function deleteFollowing(email, followingEmail) {
  try {
    const user = await findUser(email);
    const followingUser = await findUser(followingEmail);

    const existingFollowCount = await prisma.user.count({
      where: {
        id: user.id,
        following: {
          some: { id: followingUser.id },
        },
      },
    });
    if (existingFollowCount === 0) {
      throw new Error(`${email} is not following ${followingEmail}`);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        following: {
          disconnect: { id: followingUser.id },
        },
      },
    });

    console.log("Following removed successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error removing following:", error);

    // throw error;
  }
}

module.exports = {
  createUser,
  findUser,
  updateUsername,
  deleteUser,
  createPost,
  findPost,
  updatePost,
  deletePost,
  addFollower,
  deleteFollower,
  addFollowing,
  deleteFollowing,
};
