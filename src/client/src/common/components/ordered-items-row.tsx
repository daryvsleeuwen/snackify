import React from 'react';

type OrderedItemsRowProps = {
  userProfileImage: string;
  snacks: any[];
  whiteBuns: number;
  brownBuns: number;
};

const OrderedItemsRow = (props: OrderedItemsRowProps) => {
  return (
    <div className="ordered-items-row">
      <div className="ordered-items-row__titles-grid">
        <p>Snacks</p>
        <p>Broodjes</p>
      </div>

      <div className="ordered-items-row__bottom">
        <div className="ordered-items-row__profile">
          <img src={props.userProfileImage} />
        </div>
        <div className="ordered-items-row__background">
          <div className="ordered-items-row__amounts">
            {props.snacks.map((snack, index) => {
              return (
                <div key={index} className="ordered-items-row__amounts--flex">
                  <span>1x</span>
                  <img src={snack.image} />
                </div>
              );
            })}
          </div>
          <div className="ordered-items-row__amounts">
            <div className="ordered-items-row__amounts--flex">
              <span>{props.whiteBuns}x</span>
              <img src="/images/white-bun.png" />
            </div>

            <div className="ordered-items-row__amounts--flex">
              <span>{props.brownBuns}x</span>
              <img src="/images/brown-bun.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderedItemsRow;
