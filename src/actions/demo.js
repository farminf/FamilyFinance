import { startSetTransactions } from "./transactions";
import { startSetAccounts } from "./accounts";
import { startSetCategories } from "./categories";
import { login } from "./auth";
import demoUserPic from "../images/demouser.png";
import { addError } from "./errors";

export const demoChageType = demotype => ({
  type: "DEMO_CHANGE_TYPE",
  demotype: demotype
});

export const startDemo = appstate => {
  return (dispatch, getState) => {
    dispatch(demoChageType(appstate));
    dispatch(startSetTransactions());
    dispatch(startSetAccounts());
    dispatch(startSetCategories());
    dispatch(
      addError({
        code: "WARNING",
        message:
          "You are using the demo mode, all your changes will be lost if you refresh the page or logout.\n For using Family Finance, please login with your account."
      })
    );
    return dispatch(
      login({
        uid: "demo",
        photoURL: demoUserPic,
        name: "Demo User"
      })
    );
  };
};
