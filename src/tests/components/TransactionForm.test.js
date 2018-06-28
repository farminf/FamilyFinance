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
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
