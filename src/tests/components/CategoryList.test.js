import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { CategoryList } from "../../components/CategoryList";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/CategoryList";

describe("<CategoryList />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(
      <CategoryList
        classes={styles}
        categories={[
          { id: "loan", name: "loan" },
          { id: "salary", name: "salary" }
        ]}
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
