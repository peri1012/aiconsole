// The AIConsole Project
//
// Copyright 2023 10Clouds
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useCallback, useState } from 'react';
import { MessageControls } from './MessageControls';
import { CodeInput } from '../../materials/CodeInput';

interface EditableContentMessageProps {
  initialContent: string;
  isStreaming: boolean;
  language?: string;
  children?: React.ReactNode;
  handleRemoveClick?: () => void;
  handleAcceptedContent: (content: string) => void;
}

export function EditableContentMessage({ initialContent, isStreaming, children, language, handleAcceptedContent, handleRemoveClick }: EditableContentMessageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleEditClick = () => {
    if (isStreaming) {
      return;
    }
    setContent(initialContent);
    setIsEditing(true);
  };

  const handleCancelEditClick = () => setIsEditing(false);

  const handleOnChange = (value: string) => setContent(value);

  const handleSaveClick = useCallback(() => {
    handleAcceptedContent(content);
    setIsEditing(false);
  }, [content, handleAcceptedContent]);

  const handleBlur = useCallback(() => {
    // setTimeout with 0ms to delay the handleSaveClick call, this will ensure the
    // onClick event has priority over the onBlur event.
    setTimeout(handleSaveClick, 0);
  }, [handleSaveClick]);

  return (
    <div className="flex flex-grow items-start">
      {isEditing ? (
        <div className="bg-[#00000080] rounded-md w-[660px]">
          <CodeInput
            className="resize-none border-0 bg-transparent w-full outline-none h-96"
            value={content}
            onChange={handleOnChange}
            codeLanguage={language ? language : 'text'}
            transparent
            onBlur={handleBlur} // added onBlur event here
          />
        </div>
      ) : (
        children
      )}

      {!isStreaming && (
        <MessageControls
          isEditing={isEditing}
          onCancelClick={handleCancelEditClick}
          onEditClick={handleEditClick}
          onSaveClick={handleSaveClick}
          onRemoveClick={handleRemoveClick} />
      )}
    </div>
  );
}
