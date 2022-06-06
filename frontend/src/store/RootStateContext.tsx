import React from "react";
import UserStore from "./UserStore";

type RootStatecontextValue = {
    userStore: UserStore
}

const RootStateContext = React.createContext<RootStatecontextValue>({} as RootStatecontextValue)

const userStore = new UserStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    return (
        <RootStateContext.Provider value={{ userStore }}>
            {children}
        </RootStateContext.Provider>
    );
};

export const useRootStore = () => React.useContext(RootStateContext)