import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { TransactionForm } from "../../components/TransactionForm";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/TransactionForm";

describe("<TransactionForm />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(
      <TransactionForm
        classes={styles}
        accounts={[{ id: "id", name: "bank" }]}
        transaction={{
          id: "-LRfehdCidl_bQ8njUsj",
          type: "Expense",
          amount: 10000,
          description: "test",
          account: "ING Credit",
          category: "Balance",
          date: 1542625200000,
          transferFrom: "",
          transferTo: ""
        }}
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
