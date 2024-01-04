import PropTypes from 'prop-types';
const ProfilePage = ({ authUser, signOut }) => {
  return (
    <>
      <div className="flex bg-gray-50 pb-6 items-center justify-center h-screen">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-6">
          <div className="flex flex-col items-center pb-6">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://ik.imagekit.io/onnydev/D__Binar_Deploy_public_images_default_image_JmIYzjAhE.png?updatedAt=1701167313610"
              alt="Default image"
            />
            <h4 className="mb-1 text-2xl font-semibold text-gray-900">
              {authUser.name}
            </h4>
            <h4 className="mb-1 text-medium font-semibold text-gray-900">
              {authUser.email}
            </h4>
            <span className="text-sm text-gray-500">{authUser.gender}</span>
          </div>
          <div className="flex items-center justify-center mt-4 md:mt-6">
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={signOut}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

ProfilePage.propTypes = {
  authUser: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default ProfilePage;
