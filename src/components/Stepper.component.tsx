import { Step, StepButton, StepLabel, Stepper } from "@mui/material";

type StepperComponentType = {
    step: number;
    setStep: (step: number) => void;
}

function StepperComponent(props: StepperComponentType) {
    return ( 
        <Stepper nonLinear activeStep={props.step}>
            <Step completed={props.step > 0}>
              <StepButton onClick={() => props.setStep(0)}>
                <StepLabel>Generation of Keys</StepLabel>
              </StepButton>
            </Step>
            <Step completed={props.step > 1}>
              <StepButton onClick={() => props.setStep(1)}>
                <StepLabel>Appliying X gate</StepLabel>
              </StepButton>
            </Step>
            <Step completed={props.step > 2}>
              <StepButton onClick={() => props.setStep(2)}>
                <StepLabel>Polarization</StepLabel>
              </StepButton>
            </Step>
            <Step completed={props.step > 3}>
              <StepButton onClick={() => props.setStep(3)}>
                <StepLabel>Apply H gate</StepLabel>
              </StepButton>
            </Step>
            <Step completed={props.step > 4}>
              <StepButton onClick={() => props.setStep(4)}>
                <StepLabel>Generate shared key</StepLabel>
              </StepButton>
            </Step>
          </Stepper>
     );
}

export default StepperComponent;