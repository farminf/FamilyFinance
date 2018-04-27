import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import LoadProgress from "../../components/LoadProgress";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

test("should render LoadProgress correctly", () => {
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<LoadProgress />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
  const wrapper = shallow(<LoadProgress />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
