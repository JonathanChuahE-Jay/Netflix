import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, Step, StepperPrevButton, StepperStepButton, StepperFooter } from "../components/stepper/Stepper";

import "../styles/RegisterPage.css";
import Button from "../components/button/Button";
import Checkbox from "../components/checkbox/Checkbox";
import Card from "../components/cards/Card";
import Cards from "../components/cards/Cards";
import Input from "../components/input/Input";
import Text from "../components/text/Text";
import Shapes from "../components/shapes/Shapes";
import Center from "../components/center/Center";
import TNG from "../assets/img/logo/touch_and_go.png";
import Maxis from "../assets/img/logo/maxis.jpg";
import UMobile from "../assets/img/logo/Umobile2.png";
import Spinner from "../components/spinner/Spinner";
import Digi from "../assets/img/logo/digi.png";

import { faCcAmex, faCcMastercard, faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faChevronRight, faCreditCard, faDollarSign, faLock } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { setStep, setSelectedPlan, setPaymentMethod, setErrorMessage, setFormData, setIsLoading } from "../redux/RegisterSlice";
import { registerUser, useCheckEmail } from "../services/AuthServices";
import { useMutation } from "react-query";

const useRegister = () => {
    const [isChecked, setIsChecked] = useState(false);


    const { step, selectedPlan, paymentMethod, errorMessage, formData, isLoading } = useSelector((state) => state.register);

    const { register, setValue, watch } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const checkEmailMutation = useCheckEmail();

    const queryParams = new URLSearchParams(location.search);
    const prefilledEmail = queryParams.get("email") || "";

    const subscriptionPlans = useMemo(() => [
        { id: 1, name: "Mobile", price: "MYR 18.90", resolution: "420p", videoQuality: "Fair", supportedDevices: ["Mobile phone", "Tablet"], simultaneousStreams: 1, deviceLimit: 2 },
        { id: 2, name: "Basic", price: "MYR 29.90", resolution: "720p", videoQuality: "Good", supportedDevices: ["TV", "Computer", "Tablet", "Mobile phone"], simultaneousStreams: 1, deviceLimit: 2 },
        { id: 3, name: "Standard", price: "MYR 49.90", resolution: "1080p", videoQuality: "Great", supportedDevices: ["TV", "Computer", "Tablet", "Mobile phone"], simultaneousStreams: 2, deviceLimit: 2 },
        { id: 4, name: "Premium", price: "MYR 62.90", resolution: "4K + HDR", videoQuality: "Best", supportedDevices: ["TV", "Laptop", "Tablet", "Mobile phone"], simultaneousStreams: 4, deviceLimit: 6 },
    ], [])

    const benefits = [
        { icon: faCheckCircle, text: "No commitments, cancel anytime." },
        { icon: faDollarSign, text: "Everything on Netflix for one low price." },
        { icon: faLock, text: "No ads and no extra fees. Ever." },
    ];

    const paymentMethods = [
        {
            name: "Credit or Debit Card",
            description: "Set up your credit or debit card",
            icons: [
                { name: "Amex", icon: faCcAmex, type: "fa" },
                { name: "MasterCard", icon: faCcMastercard, type: "fa" },
                { name: "Visa", icon: faCcVisa, type: "fa" }
            ]
        },
        {
            name: "Digital Wallet",
            description: "Set up Touch 'n Go",
            icons: [
                { name: "Touch and Go", icon: TNG, type: "img" }
            ]
        },
        {
            name: "Add to Mobile Bill",
            description: "Set up billing through your mobile carrier",
            icons: [
                { name: "Maxis", icon: Maxis, type: "img" },
                { name: "UMobile", icon: UMobile, type: "img" },
                { name: "Digi", icon: Digi, type: "img" }
            ]
        }
    ]

    useEffect(() => {
        const subscription = watch((values) => {
            dispatch(setFormData(values));
        });
        return () => subscription.unsubscribe();
    }, [watch, dispatch]);

    useEffect(() => {
        setValue("username", formData.username);
        setValue("email", formData.email || prefilledEmail);
        setValue("password", formData.password);
        setValue("subscriptionPlan", subscriptionPlans[selectedPlan]);
    }, [formData.username, formData.email, formData.password, selectedPlan, setValue, prefilledEmail, subscriptionPlans]);

    const handleNextBtn = () => {
        dispatch(setIsLoading(true));
        if (step === 0) {
            if (selectedPlan === null) {
                dispatch(setErrorMessage("Please select a subscription plan before proceeding."));
                dispatch(setIsLoading(false));
                return;
            } else {
                dispatch(setErrorMessage(""));
                dispatch(setIsLoading(false));
                dispatch(setStep(1));
            }
        } else if (step === 1) {
            const username = watch("username");
            const email = watch("email");
            const password = watch("password");
            if (!username || !email || !password) {
                dispatch(setErrorMessage("All fields are required before proceeding."));
                dispatch(setIsLoading(false));
                return;
            } else {
                dispatch(setErrorMessage(""));
            }
            checkEmailMutation.mutate(email, {
                onSuccess: (response) => {
                    if (response.status === 200) {
                        dispatch(setErrorMessage("Email is already registered."));
                        dispatch(setIsLoading(false));
                        return;
                    }
                    dispatch(setIsLoading(false));
                    dispatch(setStep(2));
                },
                onError: (error) => {
                    const errorMessage =
                        error?.response?.data?.message || "Server error. Please try again later.";
                    dispatch(setErrorMessage(errorMessage));
                    dispatch(setIsLoading(false));
                    dispatch(setStep(1));
                },
            });
        } else if (step === 2) {
            const cardNumber = watch("card-number");
            const expirationDate = watch("expiration-date");
            const cvv = watch("cvv");
            const cardName = watch("card-name");
            const phoneNumber = watch("phoneNumber");

            if (!paymentMethod) {
                dispatch(setErrorMessage("Please select a payment method."));
                dispatch(setIsLoading(false));
                return;
            }

            if (paymentMethod?.id === 0) {
                if (!cardName || !cardNumber || !cvv || !expirationDate) {
                    dispatch(setErrorMessage("Please fill in all card details before proceeding."));
                    dispatch(setIsLoading(false));
                    return;
                }
            } else if (paymentMethod?.id === 1 || paymentMethod?.id === 2) {
                if (!phoneNumber) {
                    dispatch(setErrorMessage("Please fill in all card details before proceeding."));
                    dispatch(setIsLoading(false));
                    return;
                }
            }

            if (!isChecked) {
                dispatch(setErrorMessage("You must accept the terms."));
                dispatch(setIsLoading(false));
                return;
            }

            dispatch(setErrorMessage(""));
            setTimeout(() => {
                mutation.mutate(formData);
            }, 1000);
        }
    };

    const mutation = useMutation(registerUser, {
        onMutate: () => {
            dispatch(setIsLoading(true));
        },
        onSuccess: () => {
            dispatch(setIsLoading(false));
            navigate("/");
        },
        onError: (error) => {
            dispatch(setIsLoading(false));
            dispatch(setErrorMessage(error.response?.data?.message || "Registration failed. Please try again."));
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    return { StepperStepButton, faLock, paymentMethods, Button, faChevronRight, setPaymentMethod, StepperFooter, StepperPrevButton, handleNextBtn, isLoading, Spinner, Stepper, setStep, step, benefits, FontAwesomeIcon, Cards, Card, selectedPlan, setSelectedPlan, errorMessage, Text, Input, formData, register, setValue, paymentMethod, Step, subscriptionPlans, dispatch, prefilledEmail, faCreditCard, Shapes, Checkbox, setIsChecked, isChecked, Center };
}
export default useRegister;