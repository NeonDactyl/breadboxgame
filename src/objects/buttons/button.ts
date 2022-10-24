import { IButtonOptions } from '../../interfaces/buttons/button.interface';
export class Button extends Phaser.GameObjects.Container {
  private clickCallback: Function;
  protected isDown: boolean = false;
  
  constructor(aParams: IButtonOptions) {
    super(aParams.scene, aParams.options.x, aParams.options.y);
    
    this.clickCallback = aParams.clickCallback;
    this.on('pointerup', this.onClick);
    this.on('pointerdown', this.onPointerDown);
  }

  public onPointerOver() {
    if (this.scene.input.activePointer.primaryDown) this.isDown = true;
  }

  public onPointerOut() {
    this.isDown = false;
  }

  public onPointerDown() {
    this.isDown = true;
  }

  public onClick() {
    if (this.isDown)
      this.clickCallback();
  }
  
}
