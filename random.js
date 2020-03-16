function RandomBetween (A, B)
{
  if(B < A)
  {
    return Math.random() * (A-B) + B;
  }
  return Math.random() * (B-A) + A; // 0-1 * End + Start
}

function getRandomSound(sounds)
{
  if(sounds.length === 0)
  {
    return null;
  }
  let r = RandomBetween(0, sounds.length);
  r = Math.floor(r);
  return sounds[r];
}
