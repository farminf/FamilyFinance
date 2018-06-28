import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { MyAreaChart } from "../../components/MyAreaChart";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/MyAreaChart";

describe("<MyAreaChart />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(
      <MyAreaChart
        classes={styles}
        data={[]}
        yAxis="MyAreaChart"
        xAxis="MyAreaChart"
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
