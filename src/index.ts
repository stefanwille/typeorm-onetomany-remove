import { exit } from "process";
import { AppDataSource } from "./data-source";
import { Photo } from "./entity/Photo";
import { User } from "./entity/User";

const main = async () => {
  await AppDataSource.initialize();

  console.log("Deleting all old users...");
  await AppDataSource.manager.delete(User, {});

  console.log("Inserting a new user into the database...");
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;

  const photo = new Photo();
  photo.url = "http://myphoto";
  user.photos = [photo];

  await AppDataSource.manager.save(user);
  console.log("Saved a new user with id: " + user.id);

  console.log("Loading users from the database...");
  const users = await AppDataSource.manager.find(User);
  console.log("Loaded users: ", users);

  console.log("Removing photos from user...");
  const userToUpdate = users[0];
  userToUpdate.photos = [];
  await AppDataSource.manager.save(userToUpdate);

  console.log("Loading users from the database...");
  const reloadedUsers = await AppDataSource.manager.find(User);
  console.log("Loaded users: ", reloadedUsers);

  exit();
};

main();
