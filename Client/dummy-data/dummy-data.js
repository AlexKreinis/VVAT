import Event from "../models/event";
import User from "../models/user";

export const EVENTS = [
  new Event(
    "1",
    "yehuda ha levi 6",
    "13/5/2020",
    "10:30 - 12:30",
    "football game",
    "This sport center belongs to a nearby school and blah-blah-blah"
  ),
  new Event(
    "2",
    "dov sadan 10",
    "29/4/2020",
    "15:00 - 16:00",
    "fitness gathering",
    "This field is located inside the university complex"
  ),
  new Event(
    "3",
    "haim hazaz 4",
    "30/4/2020",
    "13:00 - 14:00",
    "meditation hour",
    "Inside the matnas building there is a fittness equipment room"
  ),
];

export const USERS = [
  new User("1", "Bob", "bob@walla.co.il", "11"),
  new User("2", "Fedya", "fedya@nana.co.il", "40"),
  new User("3", "Vladislav", "vladislav@vmail.co.il", "20"),
  new User("4", "Lola", "lola@gmail.com", "18"),
];
