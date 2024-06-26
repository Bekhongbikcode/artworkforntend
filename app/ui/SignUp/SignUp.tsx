'use client';
import { useRef, useState } from "react";
import { RegisterMember, SignUp as SignUpProps } from "@/app/component/lib/Interface";
import { z } from "zod";
import { RegisterMemberAsync } from "@/app/component/api/RegisterMemberAsync";

export default function SignUp() {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');
    
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);

    const schema = z.object({
        email: z
            .string()
            .email()
            .min(1, "Email không được để trống"),
        password: z
            .string()
            .min(8, "Mật khẩu ít nhất có 8 ký tự")
            .min(1, "Mật khẩu không được để trống"),
        firstName: z
            .string()
            .min(1, "Tên không được để trống"),
        lastName: z
            .string()
            .min(1, "Họ không được để trống"),
        phone: z
            .string()            
            .optional()
            .refine(phone => phone === null || !isNaN(Number(phone)), "Phải nhập đúng số điện thoại có 10 số"),            
        passwordConfirm: z
            .string()
            .min(8, "Mật khẩu nhập lại ít nhất có 8 ký tự")
            .min(1, "Mật khẩu nhập lại không được để trống")
    }).refine(data => data.password === data.passwordConfirm, {
        message: "Mật khẩu nhập lại không khớp với mật khẩu",
        path: ["passwordConfirm"]
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const phone = phoneRef.current?.value;
        const passwordConfirm = passwordConfirmRef.current?.value;
        const result = schema.safeParse({ email, password, firstName, lastName, phone, passwordConfirm });
        if (result.success) {
            setEmailError('');
            setPasswordError('');
            setFirstNameError('');
            setLastNameError('');
            setPhoneError('');
            setPasswordConfirmError('');
            const user: RegisterMember = {
                email: result.data.email,
                password: result.data.password,
                firstName: result.data.firstName,
                lastName: result.data.lastName,
                phoneNumber: result.data.phone ?? "" 
            };     
            const response = await RegisterMemberAsync(user);
            if (response.status === "SUCCESS") {
                alert("Đăng ký thành công");
            } else {
                alert("Đăng ký thất bại");
            }        
        } else {
            for (const error of result.error.errors) {
                if (error.path[0] === 'email') {
                    setEmailError(error.message);
                } else if (error.path[0] === 'password') {
                    setPasswordError(error.message);
                } else if (error.path[0] === 'firstName') {
                    setFirstNameError(error.message);
                } else if (error.path[0] === 'lastName') {
                    setLastNameError(error.message);
                } else if (error.path[0] === 'phone') {
                    setPhoneError(error.message);
                } else if (error.path[0] === 'passwordConfirm') {
                    setPasswordConfirmError(error.message);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col space-y-1.5'>
            <input
                ref={firstNameRef}
                type="text"
                name="firstName"
                placeholder="Tên"
                className='p-2 border-2 rounded-md hover:border-green-500 focus:border-green-500'
            />            
            {firstNameError && <p className='text-red-500'>{firstNameError}</p>}
            <input
                ref={lastNameRef}
                type="text"
                name="lastName"
                placeholder="Họ"
                className='p-2 border-2 rounded-md hover:border-green-500 focus:border-green-500'
            />
            {lastNameError && <p className='text-red-500'>{lastNameError}</p>}
            <input
                ref={emailRef}
                type="text"
                name="email"
                placeholder="Email"
                className='p-2 border-2 rounded-md hover:border-green-500 focus:border-green-500'
            />
            {emailError && <p className='text-red-500'>{emailError}</p>}            
            <input
                ref={phoneRef}
                type="text"
                name="phone"
                placeholder="Điện thoại"
                className='p-2 border-2 rounded-md hover:border-green-500 focus:border-green-500'
            />
            {phoneError && <p className='text-red-500'>{phoneError}</p>}
            <input
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="Mật khẩu"
                className='p-2 border-2 rounded-md hover:border-green-500 focus:border-green-500'
            />
            {passwordError && <p className='text-red-500'>{passwordError}</p>}            
            <input
                ref={passwordConfirmRef}
                type="password"
                name="passwordConfirm"
                placeholder="Nhập lại mật khẩu"
                className='p-2 border-2 rounded-md hover:border-green-500 focus:border-green-500'
            />
            {passwordConfirmError && <p className='text-red-500'>{passwordConfirmError}</p>}
            <button type="submit" className='p-2 bg-green-500 text-white text-lg rounded-md shadow-lg'>Đăng ký</button>
        </form>
    );
}