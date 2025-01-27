import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CommentDetails = () => {
    const {id} = useParams()
    console.log(id);
    
    return (
        <div>
            awgnerbgprgb
        </div>
    );
};

export default CommentDetails;