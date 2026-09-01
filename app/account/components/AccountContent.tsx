"use client";

import Box from "@/components/Box";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import { Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi";

const AccountContent = () => {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const [userStatus, setUserStatus] = useState('Yo ho ho!');
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    const extractUsername = (email: string | undefined) => {
        if (email) {
            const atIndex = email.indexOf('@');
            if (atIndex !== -1) {
                return email.slice(0, atIndex);
            }
        }
        return 'Stunner';
    };

    return (
    <Box className="flex flex-col items-center justify-center pt-16">
        <div className="text-neutral-400 flex flex-col items-center">
            <Tooltip
            title={
                <React.Fragment>
                    <span
                    style={{
                        fontFamily: 'Montserrat',
                        fontWeight: '600',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                    >
                    <Typography 
                        fontFamily= 'inherit'
                        fontWeight= '600'
                        fontSize= 'inherit'
                    >
                    </Typography>
                        @{extractUsername(user?.email)}
                    </span>
                </React.Fragment>
            }
            arrow={true}
            placement="top"
        >
            <Button
                onClick={() => router.push('/account')}
                className='
                bg-white
                p-4
                mb-6
                rounded-full
                hover:opacity-75
                transition
                duration-300 ease-in-out
                '
                style={{
                    borderRadius: '50%',
                    width: '160px',
                    height: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'calc(160px / 3)',
                }}
            >
                {user?.email ? user.email.substring(0, 3).toUpperCase() : 'STU'}
            </Button>
            </Tooltip>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    Glad you’re wired in &#x1F3A7;
                </span>
                <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    <strong>{extractUsername(user?.email).toUpperCase()}!</strong>
                </span>
                <br />
                <span style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                        <br />
                </span>
                <footer style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#888' }}>
                    <span>
                        &#169; {currentYear} Spotsonic AY
                    </span>
                    <br />
                    <span style={{ marginTop: '0.5rem' }}>
                        Let’s connect on{" "}
                        <a
                            href="#@realspotsonic"
                            style={{
                                color: 'rgba(255, 255, 255, 0.7)', 
                                textDecoration: 'none',
                                transition: 'color 0.3s ease, opacity 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#FFFFFF'; 
                                e.currentTarget.style.opacity = '0.9'; 
                                e.currentTarget.style.textDecoration = 'underline'; 
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'; 
                                e.currentTarget.style.opacity = '1';    
                                e.currentTarget.style.textDecoration = 'none'; 
                            }}
                        >
                            Socials
                        </a>
                        !
                    </span>
                        <br />
                    <span>
                        Stay in touch?{" "}
                        <a
                            href="mailto:devycotorg@gmail.com"
                            style={{
                                color: 'rgba(255, 255, 255, 0.7)', 
                                textDecoration: 'none',
                                transition: 'color 0.3s ease, opacity 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#FFFFFF';  
                                e.currentTarget.style.opacity = '0.9';    
                                e.currentTarget.style.textDecoration = 'underline'; 
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'; 
                                e.currentTarget.style.opacity = '1';      
                                e.currentTarget.style.textDecoration = 'none'; 
                            }}
                        >
                            Contact us
                        </a>
                        .
                    </span>
                </footer>
            </div>
        </div>
    </Box>
    );
}

export default AccountContent;
