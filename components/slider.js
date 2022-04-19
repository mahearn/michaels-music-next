import React from 'react';
import Link from 'next/router';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 500px;
  display: block;
  position: fixed;
  background-color: #fff;
  width: auto;
  left: 0;
  right: 0;
  padding-top: 80px;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  /* transition: transform 0.3 ease-in-out; */
  transition: transform 600ms cubic-bezier(0.53, 1, 0.55, 1.01) 0s;
  @media screen and (max-width: 991px) {
    width: 100vw;
    padding-top: 80px;
    padding-right: 24px;
    padding-left: 24px;
  }
`;
const SliderWrapper = styled.nav``;
const SliderList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const SliderLink = styled.a`
  padding: 8px 16px;
  @media screen and (max-width: 991px) {
    padding-top: 24px;
    padding-bottom: 24px;
    background-color: white;
    text-align: left;
  }
  &:hover {
    color: #4e67eb;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Space = styled.div`
  width: 28px;
`;

const Slider = (props) => {
  return (
    <Wrapper open={props.open}>
      <SliderWrapper>
        <SliderList>
          <SliderLink>
            <a>About me</a>
          </SliderLink>
          <SliderLink>
            <a>Scores for sale</a>
          </SliderLink>
          <SliderLink>
            <a>My Cart</a>
          </SliderLink>
          <SliderLink>
            <a>Contact me</a>
          </SliderLink>
        </SliderList>
      </SliderWrapper>
    </Wrapper>
  );
};

export default Slider;
