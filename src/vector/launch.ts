import { fetchUserStatus } from "src/models/news/user";
import eventBus from "src/modules/event-bus";
import { data } from "src/modules/global-data";

export const initApp = async () => {
    const res = await fetchUserStatus();
    data.user = res.info === "tourist" ? 0 : 1;
    eventBus.commit("user-login", data.user);
};
