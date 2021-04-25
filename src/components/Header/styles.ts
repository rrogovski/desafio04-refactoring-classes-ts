import styled from 'styled-components';

export const Container = styled.div`
  background: #c72828;
  padding: 30px 0;

  header {
    width: 100vw;
    margin: 0 auto;
    padding: 0 0 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      margin-left: 35px;
    }

    nav {
      margin-right: 50px;
      div {
        button {
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          background: #39b100;
          color: #fff;

          display: flex;
          flex-direction: row;
          align-items: center;

          .text {
            padding: 16px 24px;
          }

          .icon {
            display: flex;
            padding: 16px 16px;
            background: #41c900;
            border-radius: 0 8px 8px 0;
            margin: 0 auto;
          }
        }
      }
    }
  }
  @media screen and (max-width: 799px) {
    header {
      flex-direction: column;
      padding: 0 0 100px;

      img {
        margin: 0px;
      }


      nav {
        margin: 25px 0 0;
      }
    }
  }
`;
