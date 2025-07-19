import classNames from 'classnames';
import React from 'react';

type Props = {
  isError: string;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ isError, onClose }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isError.length === 0 },
      )}
    >
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />
      {/* show only one message at a time
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo*/}
      {isError}
    </div>
  );
};
