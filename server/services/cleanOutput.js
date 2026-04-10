const cleanAIOutput = (text) => {
 
  return text
    .replace(/Here are.*$/is, "")   
    .replace(/Meta Description.*$/is, "")
    .trim();
};

module.exports = cleanAIOutput;