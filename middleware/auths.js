export default function({store,redirect}){
    // console.log(ctx);
    if (store.getters.loggedInUser) {
        console.log("Login lew");

    } else {
        console.log("Login fail");
        return redirect("/login");
    }
    console.log("Iam a middleware");
}