function useAuth(fStore) {
  const ref = fStore().collection('challenges');
  const readChallenges = () => ref.get();
  return {readChallenges}

}
export default useAuth;
