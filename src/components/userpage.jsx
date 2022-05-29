import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { deleteuser } from "../slices/userSlice";
import { finduser } from "../slices/userSlice";
import { sortuser } from "../slices/userSlice";

const Userpage = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <Wrapper>
        <h5
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(sortuser("firstName"))}
        >
          Name SORT
        </h5>
        <h5
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(sortuser("gender"))}
        >
          Gender SORT
        </h5>
        <h5
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(sortuser("phone"))}
        >
          Mobile SORT
        </h5>
        <h5
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(sortuser("salary"))}
        >
          Expected salary SORT
        </h5>
        <h5>Edit</h5>
        <h5>Delete</h5>
      </Wrapper>
      {users.map((el) => {
        return (
          <Wrapper>
            <h5>
              {el.firstName} {el.lastName}
            </h5>
            <h5>{el.gender}</h5>
            <h5>{el.phone}</h5>
            <h5>{el.salary}</h5>
            <h5
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(finduser(el.id))}
            >
              EDIT
            </h5>
            <h5
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(deleteuser(el.id))}
            >
              X
            </h5>
          </Wrapper>
        );
      })}
    </>
  );
};

export default Userpage;

const Wrapper = styled.div`
  width: 100%;
  height: 20px;
  background-color: blue;
  border-radius: 12px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(1, 1fr);
`;
