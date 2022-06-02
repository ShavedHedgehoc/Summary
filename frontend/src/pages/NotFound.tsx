import React from 'react';

const NotFound: React.FC = (): JSX.Element => {
    return (
        <div className='d-flex align-items-center justify-content-center mw-100 vh-100 flex-md-column'>
            <div className='h1'>
                404
            </div>
            <div className='h4'>
                Страница не найдена!
            </div>
        </div>
    )
}

export default NotFound;