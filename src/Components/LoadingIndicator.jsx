import { Spinner } from "@chakra-ui/react";

const LoadingIndicator = () => {
  return (
    <div className="spinnerCo">
      <Spinner
        thickness="4px"
        color="red.500"
        size="xl"
        height={"150px"}
        w={"150px"}
      />
    </div>
  );
};

export default LoadingIndicator;