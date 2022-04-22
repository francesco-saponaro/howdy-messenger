import React from 'react'

// MaterialUI imports
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';

const AuthPhone = () => {
    return (
        <div className='phone'>
            {/* Phone header */}
            <div className='phone__header'>
                <h1>HOWDY</h1>
            </div>

            {/* Phone chat */}
            <div className='phone__chat'>
                {/* Guest message set 1 */}
                <div className='phone__chat--guest'>
                    {/* Guest message 1 */}
                    <div className='phone__chat--message-container'>
                        {/* Avatar */}
                        <div className='phone__chat--guest-image phone__chat--slide-left'>
                            <img src='/images/avatar-woman.jpg' alt='phone pic' />
                        </div>
                        {/* Message */}
                        <p className='phone__chat--slide-left'>Have you arrived in Tokyo?</p>
                        {/* Like filled icon */}
                        <div className='phone__chat-like phone__form--icon-pop'>
                            <img src='/images/like-filled.png' 
                                 alt='like icon' 
                                 className='phone__chat--like-icon phone__form--heart-pop'
                            />
                        </div>
                    </div>

                    {/* Guest message 2 */}
                    <div className='phone__chat--message-container'>
                        {/* Avatar */}
                        <div className='phone__chat--guest-image phone__chat--slide-left slide-left-2'>
                            <img src='/images/avatar-woman.jpg' alt='phone pic' />
                        </div>
                        {/* Message */}
                        <p className='phone__chat--slide-left slide-left-2'>
                            I hear it's cold this time of the year
                        </p>
                        {/* Like icon */}
                        <div className='phone__chat-like phone__form--icon-pop'>
                            <img src='/images/like.png' 
                                 alt='like icon' 
                                 className='phone__chat--like-icon'
                            />
                        </div>
                    </div>
                </div>

                {/* User message set 1 */}
                <div className='phone__chat--user'>
                    {/* User message 1 */}
                    <div className='phone__chat--message-container'>
                        {/* Like filled icon */}
                        <div className='phone__chat-like phone__form--icon-pop'>
                            <img src='/images/like-filled.png' 
                                 alt='like icon' 
                                 className='phone__chat--like-icon phone__form--heart-pop'
                            />
                        </div>
                        {/* Message */}
                        <p className='phone__chat--slide-right slide-right-1'>
                            Hi yes finally arrived, it's so cold but looking forward to the onsen
                        </p>
                        {/* Avatar */}
                        <div className='phone__chat--user-image phone__chat--slide-right slide-right-1'>
                            <img src='/images/avatar-man.jpg' alt='phone pic' />
                        </div>
                    </div>
                </div>

                {/* Guest message set 2 */}
                <div className='phone__chat--guest'>
                    {/* Guest message 3 */}
                    <div className='phone__chat--message-container'>
                        {/* Avatar */}
                        <div className='phone__chat--guest-image phone__chat--slide-left slide-left-3'>
                            <img src='/images/avatar-woman.jpg' alt='phone pic' />
                        </div>
                        {/* Message */}
                        <p className='phone__chat--slide-left slide-left-3'>Send pics!</p>
                        {/* Like icon */}
                        <div className='phone__chat-like phone__form--icon-pop'>
                            <img src='/images/like.png' 
                                 alt='like icon' 
                                 className='phone__chat--like-icon'
                            />    
                        </div>
                    </div>
                </div>

                {/* User message set 2 */}
                <div className='phone__chat--user'>
                    {/* User message 2 */}
                    <div className='phone__chat--message-container'>
                        {/* Like icon */}
                        <div className='phone__chat-like phone__form--icon-pop'>
                            <img src='/images/like.png' 
                                 alt='like icon' 
                                 className='phone__chat--like-icon'
                            />    
                        </div>
                        {/* Message */}
                        <p className='phone__chat--slide-right slide-right-2'>
                            Here you go 
                            <img src='/images/love-emoji.png' alt='smile emoji' className='phone__chat-emoji' />
                        </p>
                        {/* Avatar */}
                        <div className='phone__chat--user-image phone__chat--slide-right slide-right-2'>
                            <img src='/images/avatar-man.jpg' alt='phone pic' />
                        </div>
                    </div>

                    {/* User message 3 */}
                    <div className='phone__chat--message-container'>
                        {/* Like filled icon */}
                        <div className='phone__chat-like phone__form--icon-pop'>
                            <img src='/images/like-filled.png' 
                                 alt='like icon' 
                                 className='phone__chat--like-icon phone__form--heart-pop'
                            />    
                        </div>
                        {/* Message */}
                        <div className='phone__chat--imgContainer phone__chat--slide-right slide-right-3'>
                            <img src='../images/japan.png' alt='japan-pic' />
                        </div>
                        {/* Avatar */}
                        <div className='phone__chat--user-image phone__chat--slide-right slide-right-3'>
                            <img src='/images/avatar-man.jpg' alt='phone pic' />
                        </div>
                    </div>
                </div>

                {/* Guest message set 3 */}
                <div className='phone__chat--guest'>
                    {/* Guest message 4 */}
                    <div className='phone__chat--message-container'>
                        {/* Avatar */}
                        <div className='phone__chat--guest-image phone__chat--slide-left slide-left-4'>
                            <img src='/images/avatar-woman.jpg' alt='phone pic' />
                        </div>
                        {/* Message */}
                        <p className='phone__chat--slide-left slide-left-4'>
                            Looks great! so jealous
                            <img src='/images/crying-emoji.png' alt='smile emoji' className='phone__chat-emoji' />
                        </p>
                        {/* Like filled icon */}
                        <div className='phone__chat-like phone__form--icon-pop'>
                            <img src='/images/like-filled.png' 
                                 alt='like icon' 
                                 className='phone__chat--like-icon phone__form--heart-pop'
                            />    
                        </div>
                    </div>
                </div>
            </div>

            {/* Phone input layout */}
            <form className='phone__form'>
                {/* Input */}
                <input className='phone__form--input' type='text' placeholder='Type a message...'/>
                {/* File icon */}
                <CropOriginalIcon className='phone__form--icons' />
                {/* Emoji icon */}
                <InsertEmoticonIcon className='phone__form--icons' />
                {/* Submit icon */}
                <SendIcon className='phone__form--icon-submit phone__form--icon-pop' />
            </form>
        </div>
    )
}

export default AuthPhone