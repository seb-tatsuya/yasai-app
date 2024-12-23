export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) =>{
    return{
        type: "SIGN_IN",
        payload:{
            isSignenIn: true,
            role: userState.role,
            uid: userState.uid,
            userName: userState.userName
        }
    }
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return{
        type: "SIGN_OUT",
        payload:{
            isSignenIn: false,
            uid: "",
            userName: ""
        }
    }
}