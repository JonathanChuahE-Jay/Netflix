import useRegister from "../hooks/useRegister";

const RegisterPage = () => {
    const { faLock, paymentMethods, Button, faChevronRight, setPaymentMethod, StepperFooter, StepperPrevButton, handleNextBtn, isLoading, Spinner, Stepper, setStep, step, benefits, FontAwesomeIcon, Cards, Card, selectedPlan, setSelectedPlan, errorMessage, Text, Input, formData, register, setValue, paymentMethod, Step, subscriptionPlans, dispatch, prefilledEmail, faCreditCard, Shapes, Checkbox, setIsChecked, isChecked, Center, StepperStepButton } = useRegister();
    
    return (
        <div className="register-page">
            {
                isLoading ?
                    <div className="loading">
                        <Spinner variant="bars" />
                    </div>
                    :
                    <Stepper minHeight="80vh" width="100%" setStep={setStep} currentStep={step} color="white">
                        <Step title="First" description="Choose your plan">
                            <div className="benefits-container">
                                {benefits.map((item, index) => (
                                    <div key={index} className="benefit-item">
                                        <FontAwesomeIcon icon={item.icon} size="2x" color="red" />
                                        <p>{item.text}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="plan-container">
                                <Cards>
                                    {subscriptionPlans.map((plan, index) => (
                                        <Card
                                            key={index}
                                            cursor="pointer"
                                            width="280px"
                                            isSelected={selectedPlan === index}
                                            onClick={() => dispatch(setSelectedPlan(index))}
                                        >
                                            <h3 className="plan-title">{plan.name}</h3>
                                            <p className="plan-price">{plan.price}/month</p>
                                            <p>{plan.resolution} Resolution</p>
                                            <p>{plan.deviceLimit} Device Limit</p>
                                            <p>{plan.simultaneousStreams} Simultaneous Streams</p>
                                            <ul className="plan-device-tags">
                                                {plan.supportedDevices.map((device, i) => (
                                                    <li className="plan-device-tag" key={i}>{device}</li>
                                                ))}
                                            </ul>
                                        </Card>
                                    ))}
                                </Cards>
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </Step>

                        <Step title="Second" description="Setting up account">
                            <Text color="white" fontWeight="bold">
                                Create a password to start your membership
                            </Text>
                            <Text color="white">
                                Just a few more steps and you're done!
                                We hate paperwork, too.
                            </Text>
                            <div className="register-form">
                                <Input value={formData.username} register={register} setValue={setValue} name="username" placeholder="Username" required />
                                <Input value={formData.email} bg={prefilledEmail? "darkgray" : "white"} disabled={prefilledEmail? true : false} deleteBtn={prefilledEmail ? false : true} register={register} setValue={setValue} name="email" placeholder="Email" defaultValue={prefilledEmail} required />
                                <Input value={formData.password} passwordView={true} type="password" register={register} setValue={setValue} name="password" placeholder="Password" required />
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </Step>
                        <Step title="Third" description="Choose how to pay">
                            {paymentMethod.id === 0 ? (
                                <div className="payment-method-container">
                                    <Text fontWeight="bold" size="xl" color="white">{paymentMethod.description}</Text>
                                    <div className="payment-icons">
                                        {paymentMethod.icons.map((icon, i) =>
                                            icon.type === "fa" ? (
                                                <FontAwesomeIcon key={i} icon={icon.icon} size="xl" />
                                            ) : (
                                                <img key={i} src={icon.icon} alt={icon.name} style={{ height: "20px", width: "30px", borderRadius: "5px", marginLeft: "10px" }} />
                                            )
                                        )}
                                    </div>
                                    <Input value={formData["card-number"]} register={register} setValue={setValue} name="card-number" placeholder="Card number" icon={faCreditCard} iconPosition="right" iconSize="lg" required />
                                    <div className="payment-method-input-split">
                                        <Input value={formData["expiration-date"]} register={register} setValue={setValue} name="expiration-date" placeholder="Expiration date" required />
                                        <Input value={formData["cvv"]} register={register} setValue={setValue} name="cvv" placeholder="CVV" required />
                                    </div>
                                    <Input value={formData["card-name"]} register={register} setValue={setValue} name="card-name" placeholder="Name on card" required />
                                    <Shapes className="payment-subscription-change-container" shape="rectangle" bg="lightgray" width="100%" height="50px" borderRadius="5px">
                                        <div className="payment-subscription-change-info">
                                            <Text margin="0px" size="md" fontWeight="normal">{formData?.subscriptionPlan?.price} / Month</Text>
                                            <Text margin="0px" size="md" fontWeight="normal">{formData?.subscriptionPlan?.name}</Text>
                                        </div>
                                        <div className="payment-subscription-change-button" onClick={() => dispatch(setStep(0))}>
                                            Change
                                        </div>
                                    </Shapes>
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    <Text color="gray" size="sm" textAlign="left">
                                        Your payments will be processed internationally. Additional bank fees may apply.
                                    </Text>
                                    <Text color="gray" size="sm" textAlign="left">
                                        By checking the checkbox below, you agree to our Terms of Use, Privacy Statement, and that you are over 18. Netflix will automatically continue your membership and charge the membership fee (currently RM 29.90/month) to your payment method until you cancel. You may cancel at any time to avoid future charges.
                                    </Text>
                                    <Checkbox label="Accept Terms & Conditions"
                                        checked={isChecked}
                                        onChange={() => setIsChecked(!isChecked)}
                                        border="1px solid black"
                                        color="white"
                                        bg="lightyellow"
                                        tickColor="black"
                                        width="15px"
                                        height="15px"
                                        fontSize="10px"
                                        className="custom-checkbox"
                                    />
                                </div>
                            ) : paymentMethod.id === 1 || paymentMethod.id === 2 ? (
                                <div className="payment-method-container">
                                    <Text fontWeight="bold" size="xl" color="white">{paymentMethod.description}</Text>
                                    <div className="payment-icons">
                                        {paymentMethod.icons.map((icon, i) =>
                                            icon.type === "fa" ? (
                                                <FontAwesomeIcon key={i} icon={icon.icon} size="xl" />
                                            ) : (
                                                <img key={i} src={icon.icon} alt={icon.name} style={{ height: "20px", width: "30px", borderRadius: "5px", marginLeft: "10px" }} />
                                            )
                                        )}
                                    </div>
                                    <Text color="white" size="md" textAlign="left">
                                        Your number will also be used if you forget your password and for important account messages. SMS fees may apply.
                                    </Text>
                                    <Input value={formData["phoneNumber"]} register={register} setValue={setValue} name="phoneNumber" placeholder="Mobile number" required />
                                    <Shapes className="payment-subscription-change-container" shape="rectangle" bg="lightgray" width="100%" height="50px" borderRadius="5px">
                                        <div className="payment-subscription-change-info">
                                            <Text margin="0px" size="md" fontWeight="normal">{formData?.subscriptionPlan?.price} / Month</Text>
                                            <Text margin="0px" size="md" fontWeight="normal">{formData?.subscriptionPlan?.name}</Text>
                                        </div>
                                        <div className="payment-subscription-change-button" onClick={() => dispatch(setStep(0))}>
                                            Change
                                        </div>
                                    </Shapes>
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    <Text color="gray" size="sm" textAlign="left">
                                        By checking the checkbox below, you agree to our Terms of Use, Privacy Statement, and that you are over 18. Netflix will automatically continue your membership and charge the membership fee (currently RM 29.90/month) to your payment method until you cancel. You may cancel at any time to avoid future charges.
                                    </Text>
                                    <Checkbox label="Accept Terms & Conditions"
                                        checked={isChecked}
                                        onChange={() => setIsChecked(!isChecked)}
                                        border="1px solid black"
                                        color="white"
                                        tickColor="black"
                                        bg="lightyellow"
                                        width="15px"
                                        height="15px"
                                        fontSize="10px"
                                        className="custom-checkbox"
                                        variant="cross"
                                    />
                                </div>
                            ) : (
                                <>
                                    <Center>
                                        <Shapes border="2px solid lightblue" shape="circle" hasHole={true} width="10px" height="10px" padding="20px">
                                            <FontAwesomeIcon icon={faLock} size="xl" />
                                        </Shapes>
                                    </Center>
                                    <Text color="white">
                                        Your payment is encrypted and you can change how you pay anytime.
                                        Secure for peace of mind.
                                    </Text>
                                    <Text color="white" fontWeight="bold" marginBottom="20px">
                                        Cancel easily online.
                                    </Text>

                                    {paymentMethods.map((method, index) => (
                                        <Button
                                            key={index}
                                            iconToRight={true}
                                            iconPosition="right"
                                            icon={faChevronRight}
                                            marginBottom="20px"
                                            bg={paymentMethod === method.name ? "lightblue" : "transparent"}
                                            border="1px solid white"
                                            width="100%"
                                            padding="20px"
                                            onClick={() => dispatch(setPaymentMethod({ ...method, id: index }))}
                                        >
                                            {method.name}
                                            {method.icons.map((icon, i) =>
                                                icon.type === "fa" ? (
                                                    <FontAwesomeIcon key={i} icon={icon.icon} size="xl" style={{ marginLeft: "10px" }} />
                                                ) : (
                                                    <img key={i} src={icon.icon} alt={icon.name} style={{ height: "20px", width: "30px", borderRadius: "5px", marginLeft: "10px" }} />
                                                )
                                            )}
                                        </Button>
                                    ))}
                                </>
                            )}
                        </Step>
                        <StepperFooter>
                            <StepperPrevButton stopStep={paymentMethod ? true : false} onClick={() => {
                                if (step > 0) {
                                    dispatch(setStep(step - 1));
                                    dispatch(setPaymentMethod(""))
                                }
                            }} />
                            <StepperStepButton
                                tooltipFontSize="10px"
                                tooltip={paymentMethod && !isChecked}
                                label="Please accept the terms and condition"
                                bg={paymentMethod ? !isChecked ? "gray" : "red" : ""}
                                onClick={() => { handleNextBtn() }}
                                display={step === 2 && !paymentMethod ? "none" : "block"}
                                step={step}
                                disabled={selectedPlan === null || (paymentMethod && !isChecked)}
                            >
                                {paymentMethod ? "Start Membership" : "Next"}
                            </StepperStepButton>
                        </StepperFooter>
                    </Stepper>
            }
        </div>
    );
};

export default RegisterPage;
