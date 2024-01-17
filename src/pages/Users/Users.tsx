import React, { ChangeEvent, useEffect, useState } from "react"
import './Users.scss'
import axios from "axios"
import Success from "../../components/users/Success"
import User from "../../components/users/User"
import Skeleton from "../../components/users/Skeleton"

const UsersSearch = () => {
    const [users, setUsers] = useState([])
    const [invites, setInvites] = useState([0])
    const [isLoading, setIsLoading] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://reqres.in/api/users')
                setUsers(response.data.data)
            } catch (error) {
                console.log(error)
                alert("Error While Fetching User")
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const onClickInvite = (id: any) => {
        if (invites.includes(id)) {
            setInvites((prev) => prev.filter((_id: any) => _id !== id))
        } else {
            setInvites((prev) => [...prev, id])
        }
    }

    const onClickSendInvites = () => {
        setSuccess(true)
    }

    return (
        <div className="users-main">
            {success ? (
                <Success count={invites.length - 1} />
            ) : (
                <Users
                    onChangeSearchValue={onChangeSearchValue}
                    searchValue={searchValue}
                    items={users}
                    isLoading={isLoading}
                    invites={invites}
                    onClickInvite={onClickInvite}
                    onClickSendInvites={onClickSendInvites}
                />
            )}
        </div>
    )
}

interface UsersProps {
    items: any;
    isLoading: boolean
    searchValue: string
    invites: any
    onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void
    onClickSendInvites: () => void
    onClickInvite: (id: any) => void;
}

const Users = ({
    items,
    isLoading,
    onChangeSearchValue,
    searchValue,
    invites,
    onClickInvite,
    onClickSendInvites,
}: UsersProps) => {
    return (
        <>
            <div className="search">
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
                <input
                    value={searchValue}
                    type="text"
                    onChange={onChangeSearchValue}
                    placeholder="Search for user ... "
                />
            </div>
            {isLoading ? (
                <div className="skeleton-list">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            ) : (
                <ul className="users-list">
                    {items
                        .filter((obj: any) => {
                            const fullName = (obj.first_name + obj.last_name).toLowerCase();
                            return (
                                fullName.includes(searchValue.toLowerCase()) ||
                                obj.email.toLowerCase().includes(searchValue.toLowerCase())
                            );
                        })
                        .map((obj: any) => (
                            <User
                                onClickInvite={onClickInvite}
                                isInvited={invites.includes(obj.id)}
                                key={obj.id}
                                {...obj}
                            />
                        ))}
                </ul>
            )}
            {invites.length - 1 > 0 && (
                <button onClick={onClickSendInvites} className="send-invite-btn">
                    Send invitation
                </button>
            )}
        </>
    )
}

export default UsersSearch