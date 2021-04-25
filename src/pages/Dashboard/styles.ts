import styled from 'styled-components';

export const FoodsContainer = styled.div`
  /* width: 100vw; */
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px;
  margin-top: -140px;

  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 32px;
  }

  @media screen and (max-width: 799px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 32px;
  }
`;
