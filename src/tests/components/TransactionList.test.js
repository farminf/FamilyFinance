import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { TransactionList } from "../../components/TransactionList";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/TransactionList";

describe("<TransactionList />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(
      <TransactionList
        classes={styles}
        transactions={[{ id: "dfsadadf231", amount: "10" }]}
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
