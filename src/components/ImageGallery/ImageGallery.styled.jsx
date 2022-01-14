import styled from "styled-components";

export const List = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 20px;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
export const Message = styled.p`
  text-align: center;
  padding-top: 20px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;
