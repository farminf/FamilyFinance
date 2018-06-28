import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { FilterDashboard } from "../../components/FilterDashboard";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/FilterDashboard";

describe("<FilterDashboard />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(
      <FilterDashboard
        classes={styles}
        filters={{ dashboardMonthFilter: "01" }}
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
