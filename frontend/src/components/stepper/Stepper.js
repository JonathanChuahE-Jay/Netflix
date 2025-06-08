import React, { createContext, useContext, useEffect, useState } from "react";
import "./Stepper.css";
import Tooltip from "../tooltip/Tooltip";

const StepperContext = createContext();

const Stepper = ({ children, color, clickableCircle = false, allowedStep, currentStep, setStep: externalSetStep, height, minHeight, minWidth, padding, width, marginBottom, bg }) => {
    const steps = React.Children.toArray(children).filter(
        (child) => [Step].includes(child.type)
    );

    const navigationButtons = React.Children.toArray(children).filter(
        (child) => [StepperPrevButton, StepperNextButton, StepperStepButton].includes(child.type)
    );

    const footerContent = React.Children.toArray(children).find(
        (child) => child.type === StepperFooter
    );

    const totalSteps = steps.length;
    const [step, setStep] = useState(currentStep ?? 0);

    useEffect(() => {
        if (currentStep !== undefined) {
            setStep(currentStep);
        }
    }, [currentStep]);

    const nextStep = () => {
        if (step < totalSteps - 1 && (!allowedStep || step < allowedStep)) {
            const newStep = step + 1;
            setStep(newStep);
            externalSetStep?.(newStep);
        }
    };

    const prevStep = () => {
        if (step > 0) {
            const newStep = step - 1;
            setStep(newStep);
            externalSetStep?.(newStep);
        }
    };

    const goToStep = (stepIndex) => {
        if (stepIndex >= 0 && stepIndex < totalSteps && (!allowedStep || stepIndex <= allowedStep)) {
            setStep(stepIndex);
            externalSetStep?.(stepIndex);
        }
    };

    return (
        <StepperContext.Provider value={{ step, totalSteps, nextStep, prevStep, goToStep, allowedStep }}>
            <div style={{ width, height, minHeight, minWidth, padding, backgroundColor:bg}} className="stepper-container">
                <div className="stepper">
                    {steps.map((stepItem, index) => (
                        <div key={index} className="step-wrapper">
                            <div className="step-circle-container">
                                <div
                                    className={`step-circle ${index <= step ? "active" : ""}`}
                                    onClick={clickableCircle && (!allowedStep || index <= allowedStep) ? () => goToStep(index) : undefined}
                                    style={{ cursor: clickableCircle && (!allowedStep || index <= allowedStep) ? "pointer" : "default" }}
                                >
                                    {index + 1}
                                </div>
                                <div className="step-circle-content">
                                    <span className="step-title" style={{ color }}>{stepItem.props.title}</span>
                                    <span className="step-description">{stepItem.props.description}</span>
                                </div>
                            </div>
                            {index < steps.length - 1 && <div className={`step-line ${index < step ? "active-line" : ""}`}></div>}
                        </div>
                    ))}
                </div>

                <div className="step-content">{steps[step]}</div>

                <div className="stepper-buttons">
                    {navigationButtons}
                </div>
                {footerContent}
            </div>
        </StepperContext.Provider>
    );
};

const Step = ({ children, color, width, height, bg }) => (
    <div style={{ color, width, height, backgroundColor: bg }}>
        {children}
    </div>
);

const StepperPrevButton = ({ stopStep = false, display, marginTop, bg, color, width, height, children = "Previous", onClick = () => { }, disabled = false }) => {
    const { step, prevStep } = useContext(StepperContext);

    const handlePrevClick = () => {
        if (!stopStep) {
            prevStep();
        }
        onClick();
    };

    return (
        <button style={{ backgroundColor: bg, color, width, height, display, marginTop }} onClick={handlePrevClick} disabled={step === 0 || disabled}>
            {children}
        </button>
    );
};

const StepperNextButton = ({ bg, color, width, height, children = "Next", onClick = () => { }, disabled = false, display }) => {
    const { marginTop, step, totalSteps, nextStep, allowedStep } = useContext(StepperContext);
    return (
        <button
            style={{ backgroundColor: bg, color, width, height, display, marginTop }}
            onClick={() => { nextStep(); onClick(); }}
            disabled={step >= totalSteps - 1 || (allowedStep !== undefined && step >= allowedStep) || disabled}
        >
            {children}
        </button>
    );
};

const StepperStepButton = ({ tooltipFontSize, tooltip= false, label, bg, color, width, height, marginTop, step, children = "Next", onClick = () => { }, disabled = false, display }) => {
    const { goToStep, allowedStep } = useContext(StepperContext);

    const handleClick = () => {
        goToStep(step);
        onClick();
    };

    const isDisabled = step < 0 || (allowedStep !== undefined && step > allowedStep) || disabled;

    const button = (
        <button
            style={{ display, backgroundColor: bg, color, width, height, marginTop }}
            onClick={handleClick}
            disabled={isDisabled}
        >
            {children}
        </button>
    );

    return tooltip ? <Tooltip fontSize={tooltipFontSize} text={label}>{button}</Tooltip> : button;
};

const StepperFooter = ({ children }) => {
    return <div className="stepper-footer">{children}</div>;
};


export { Stepper, Step, StepperPrevButton, StepperNextButton, StepperStepButton, StepperFooter };
