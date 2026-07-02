export class HintSystem {
  getHint(mission, hintIndex) {
    if (!mission || !mission.hints) return null;
    const idx = Math.min(hintIndex, mission.hints.length - 1);
    return {
      text: mission.hints[idx],
      number: idx + 1,
      total: mission.hints.length,
      hasMore: idx < mission.hints.length - 1
    };
  }

  canViewSolution(hintsUsed, attempts) {
    return hintsUsed >= 3 || attempts >= 5;
  }

  getSolution(mission) {
    return mission?.solution || '';
  }

  getExplanation(mission) {
    return mission?.explanation || '';
  }
}
