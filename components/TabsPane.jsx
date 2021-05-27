/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Box, Center, Radio, RadioGroup, Stack, Spinner } from "@chakra-ui/react";

const TabsPane = (props) => {
  const { currentTab } = props;
  const { operations } = props;
  const { setOperation } = props;
  const { isLoaded } = props;

  const [value, setValue] = useState("");

  useEffect(() => {}, [currentTab]);
  useEffect(() => {
    setOperation(value);
  }, [value]);

  const operationsObject = {};

  operations.forEach((el) => {
    if (el) operationsObject[el.name] = el.fields;
  });

  const displayArray = [];
  const display = () => {
    if (isLoaded === false) return <Center> <Spinner /> </Center> ;
    if (isLoaded === true) return displayArray;
    return <p>Enter URL above to get schema</p>;
  };

  Object.keys(operationsObject).forEach((key) => {
    if (key === currentTab) {
      displayArray.push(
        operationsObject[key].forEach((operation) => {
          if (key === currentTab)
            displayArray.push(
              <Radio
                id={`${key}`}
                value={`${operation.name}`}
                name="operation"
                key={`${operation.name}Select`}
              >
                {operation.name}
              </Radio>
            );
        })
      );
    }
  });
  return (
    <Box h={300} overflowY="auto">
    <RadioGroup onChange={setValue} value={value}>
      <Stack>{display()}</Stack>
    </RadioGroup>
    </Box>
  );
};

export default TabsPane;
