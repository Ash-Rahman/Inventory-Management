function useCheckin(fStore) {
  const ref = fStore().collection('checkins');
  const createCheckin  = checkin => ref.add(checkin);
  const readCheckins = () => ref.get();

  // below we add the methods to create a sub collection to hold checkin comments
  const createItemHistory = (checkinID, comment) => ref.doc(checkinID).collection('comments').add(comment);
  const readItemHistory = (checkinID) => ref.doc(checkinID).collection('comments').get();

  return {createCheckin, readCheckins, createItemHistory, readItemHistory}
}
export default useCheckin;
