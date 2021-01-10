function useItem(fStore) {
  const ref = fStore().collection('items');
  const createCheckin  = checkin => ref.add(checkin);
  const readCheckins = () => ref.get();

  //const updateCheckin = (checkinID, data) => ref.doc(checkinID).add(data);
  const getCheckinById = checkinID => ref.doc(checkinID).get();
  const updateCurrentItemUser = (checkinID, item) => ref.doc(checkinID).update(item);

  // below we add the methods to create a sub collection to hold checkin comments
  const createComment = (checkinID, comment) => ref.doc(checkinID).collection('comments').add(comment);

  const readComments = (checkinID) => ref.doc(checkinID).collection('comments').get();

  return {createCheckin, readCheckins, createComment, readComments, getCheckinById, updateCurrentItemUser}
}
export default useItem;
