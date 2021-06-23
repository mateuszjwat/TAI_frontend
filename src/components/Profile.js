import useChangeTitle from "./ChangeTitle";
import UpdateAccount from "./Login/UpdateAccount";


function Profile (props){
    useChangeTitle("Profile");

    if(props.user){
        console.log(props.user);

        return(
            <div>
                <UpdateAccount user={props.user}  setUser={props.setUser}/>
            </div>
        );
    } 

    return <div></div>
}
  
export default Profile;