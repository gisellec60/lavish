import 'bootstrap/dist/css/bootstrap.min.css';
import {AdminPortal} from "./AdminPortal"
import ParentPortal from "./ParentPortal"
import "./styles.css"

export const Portal = ({isAdmin}) => {
  return (
    <div>
        {
            isAdmin ?<AdminPortal /> :
            <ParentPortal />
        }
   </div>
  )
}

