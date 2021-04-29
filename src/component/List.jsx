import React, { useState } from 'react';

const List = () => {
    const [index, setIndex] = useState(4);
    return (
        <div>
            {index}
            <span> Hi</span>
        </div>
    );
};
export default List;
