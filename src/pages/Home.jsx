const createConvo = async (e) => {
    e.preventDefault();
    try {
        const res = await createConversation({ character: "oscar-wilde", prompt });
        const conversationId = res?.data?.conversationId;
        navigate(`/conversation/${conversationId}`);
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Failed to create conversation');
    }
};
