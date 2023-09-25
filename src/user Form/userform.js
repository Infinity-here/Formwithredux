// import { useState } from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetGeneralInfo } from "../redux/slice";

function UserForm() {
  const dispatch = useDispatch();
  const RegisteredData = useSelector((state) => state.User);
  const [buttonStatus, setbuttonStatus] = useState(false);
  const [exist, setExist] = useState(false);
  const [block, setblock] = useState(1);
  const [mail, setmail] = useState({
    id: "",
    mailData: "",
  });
  const [PersonalData, SetpersonalData] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    gender: "",
  });
  const [pass, setpass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [Email, setEmail] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.name === "mailData") {
      setmail({ id: new Date().toLocaleTimeString(), mailData: value });
    } else if (name === "pass") {
      setpass(value);
    } else if (name === "confirmpass") {
      setconfirmpass(value);
      if (pass && pass === value) {
        setbuttonStatus(true);
      }
    }
    SetpersonalData({ ...PersonalData, [`${name}`]: value });
    setExist(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mail);
    if (block === 1) {
      const data = JSON.parse(localStorage.getItem("Email"));
      if (data.length) {
        console.log(data, "hiiii");
        setEmail([...data, mail]);
      } else {
        setEmail([mail]);
      }

      const tofind = Email.find((e) => {
        if (e.mailData === mail.mailData) {
          return true;
        } else {
          return false;
        }
      });
      setExist(tofind);
      setblock((prev) => prev + 1);
    } else {
      setblock((prev) => prev + 1);
    }
  };
  if (exist) {
    alert("Email Already Exist");
  } else {
    localStorage.setItem("Email", JSON.stringify(Email));
  }
  console.log(RegisteredData);
  return (
    <>
      <form
        onSubmit={(e) => {
          console.log(PersonalData, "personal");
          e.preventDefault();
          dispatch(
            SetGeneralInfo({
              Id: mail.id,
              Email: mail.mailData,
              FirstName: PersonalData.firstName,
              LastName: PersonalData.lastName,
              ContactNo: PersonalData.contactNo,
              Gender: PersonalData.gender,
              Password: pass,
            })
          );
        }}
      >
        {block === 1 && (
          <div>
            <label htmlFor="mailData">User Email</label>
            <input
              type="Email"
              name="mailData"
              id="mailData"
              value={mail.mailData}
              onChange={(e) => handleChange(e, "email")}
            />
            <button onClick={handleSubmit}>Next</button>
          </div>
        )}
        {block === 2 && (
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="string"
              name="firstName"
              id="firstName"
              value={PersonalData.firstName}
              onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="string"
              name="lastName"
              id="lastName"
              value={PersonalData.lastName}
              onChange={handleChange}
            />
            <label htmlFor="contactNo">contact Number</label>
            <input
              type="number"
              name="contactNo"
              id="contactNo"
              value={PersonalData.contactNo}
              onChange={handleChange}
            />
            <label htmlFor="gender">Gender</label>
            <input
              type="string"
              name="gender"
              id="gender"
              value={PersonalData.gender}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Next</button>
            <butoon
              onClick={() => {
                setblock((prev) => prev - 1);
              }}
            >
              Back
            </butoon>
          </div>
        )}
        {block === 3 && (
          <div>
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              name="pass"
              id="pass"
              value={pass}
              onChange={handleChange}
            />
            <label htmlFor="confirmpass">Confirm Password</label>
            <input
              type="password"
              name="confirmpass"
              id="confirmpass"
              value={confirmpass}
              onChange={handleChange}
            />
            <butoon
              onClick={() => {
                setblock((prev) => prev - 1);
              }}
            >
              Back
            </butoon>
            <div>{buttonStatus && <button type="submit">Register</button>}</div>
          </div>
        )}
      </form>
    </>
  );
}

export default UserForm;
