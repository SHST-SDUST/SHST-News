import { fetchUserStatus } from "src/models/news/user";
import eventBus from "src/modules/event-bus";
import { data } from "src/modules/global-data";
import storage from "src/modules/storage";

export const initApp = async () => {
    const res = await fetchUserStatus();
    data.user = res.info === "tourist" ? 0 : 1;
    storage("session").set("user-login", data.user.toString());
    eventBus.commit("user-login", data.user);
};
