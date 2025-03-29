import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const SomeParentComponent = () => {
  // Nếu user prop không thay đổi, có thể memo hóa nó
  const user = React.useMemo(() => ({
    name: "Some Name",
    avatar: "some_url"
  }), []); // Empty dependency array if user never changes

  return <Navbar user={user} />;
};

export default SomeParentComponent; 